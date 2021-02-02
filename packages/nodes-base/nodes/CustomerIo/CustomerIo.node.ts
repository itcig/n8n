import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {
	customerIoApiRequest,
	validateJSON,
} from './GenericFunctions';
import {
	broadcastFields,
	broadcastOperations,
} from './BroadcastDescription';
import {
	campaignFields,
	campaignOperations,
} from './CampaignDescription';
import {
	customerFields,
	customerOperations,
} from './CustomerDescription';
import {
	eventFields,
	eventOperations,
} from './EventDescription';
import {
	messageFields,
	messageOperations,
} from './MessageDescription';
import {
	newsletterFields,
	newsletterOperations,
} from './NewsletterDescription';
import {
	segmentFields,
	segmentOperations,
} from './SegmentDescription';


export class CustomerIo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Customer.io',
		name: 'customerIo',
		icon: 'file:customerio.png',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Customer.io API',
		defaults: {
			name: 'CustomerIo',
			color: '#ffcd00',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'customerIoApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Broadcast',
						value: 'broadcast',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Newsletter',
						value: 'newsletter',
					},
					{
						name: 'Segment',
						value: 'segment',
					},
				],
				default: 'customer',
				description: 'Resource to consume.',
			},
			// BROADCAST
			...broadcastOperations,
			...broadcastFields,
			// CAMPAIGN
			...campaignOperations,
			...campaignFields,
			// CUSTOMER
			...customerOperations,
			...customerFields,
			// EVENT
			...eventOperations,
			...eventFields,
			// MESSAGE
			...messageOperations,
			...messageFields,
			// NEWSLETTER
			...newsletterOperations,
			...newsletterFields,
			// SEGMENT
			...segmentOperations,
			...segmentFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const body: IDataObject = {};

		let responseData;
		for (let i = 0; i < items.length; i++) {

			if (resource === 'broadcast') {
				if (operation === 'get') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const endpoint = `/broadcasts/${broadcastId}`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.broadcast;
				}

				if (operation === 'getAction') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/broadcasts/${broadcastId}/actions/${actionId}`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.action;
				}

				if (operation === 'getActions') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const endpoint = `/broadcasts/${broadcastId}/actions`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.actions;
				}

				if (operation === 'getAll') {
					const endpoint = `/broadcasts`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.broadcasts;
				}

				if (operation === 'getLinks') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/broadcasts/${broadcastId}/actions/${actionId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');

					const enrichedData = [];
					for (const item of responseData.links) {
						enrichedData.push({
							id: item.link && item.link.id,
							url: item.link && item.link.href,
							broadcast_id: broadcastId,
							action_id: actionId,	
						});
					} 

					responseData = enrichedData;
				}

				if (operation === 'getLinkMetrics') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/broadcasts/${broadcastId}/actions/${actionId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.links;
				}

				if (operation === 'getMetrics') {
					const broadcastId = this.getNodeParameter('broadcastId', i) as number;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;

						if (additionalFieldsJson !== '') {

							if (validateJSON(additionalFieldsJson) !== undefined) {

								Object.assign(body, JSON.parse(additionalFieldsJson));

							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const period = this.getNodeParameter('period', i) as string;
						let endpoint = `/broadcasts/${broadcastId}/metrics`;

						if (period !== 'days') {
							endpoint = `${endpoint}?period=${period}`;
						}
						if (additionalFields.steps) {
							body.steps = additionalFields.steps as number;
						}
						if (additionalFields.type) {
							if (additionalFields.type === 'urbanAirship') {
								additionalFields.type = 'urban_airship';
							} else {
								body.type = additionalFields.type as string;
							}
						}

						responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
						responseData = responseData.metric;
					}
				}
			}

			if (resource === 'campaign') {
				if (operation === 'get') {
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const endpoint = `/campaigns/${campaignId}`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.campaign;
				}

				if (operation === 'getAction') {
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/campaigns/${campaignId}/actions/${actionId}`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.action;
				}

				if (operation === 'getActions') {
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const endpoint = `/campaigns/${campaignId}/actions`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.actions;
				}

				if (operation === 'getAll') {
					const endpoint = `/campaigns`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.campaigns;
				}

				if (operation === 'getLinks') {
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/campaigns/${campaignId}/actions/${actionId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');

					const enrichedData = [];
					for (const item of responseData.links) {
						enrichedData.push({
							id: item.link && item.link.id,
							url: item.link && item.link.href,
							campaign_id: campaignId,
							action_id: actionId,
						});
					} 

					responseData = enrichedData;
				}

				if (operation === 'getLinkMetrics') {					
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const actionId = this.getNodeParameter('actionId', i) as number;
					const endpoint = `/campaigns/${campaignId}/actions/${actionId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.links;
				}

				if (operation === 'getMetrics') {
					const campaignId = this.getNodeParameter('campaignId', i) as number;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;

						if (additionalFieldsJson !== '') {

							if (validateJSON(additionalFieldsJson) !== undefined) {

								Object.assign(body, JSON.parse(additionalFieldsJson));

							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const period = this.getNodeParameter('period', i) as string;
						let endpoint = `/campaigns/${campaignId}/metrics`;

						if (period !== 'days') {
							endpoint = `${endpoint}?period=${period}`;
						}
						if (additionalFields.steps) {
							body.steps = additionalFields.steps as number;
						}
						if (additionalFields.type) {
							if (additionalFields.type === 'urbanAirship') {
								additionalFields.type = 'urban_airship';
							} else {
								body.type = additionalFields.type as string;
							}
						}

						responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
						responseData = responseData.metric;
					}
				}
			}

			if (resource === 'customer') {

				if (operation === 'upsert') {
					const id = this.getNodeParameter('id', i) as number;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;

						if (additionalFieldsJson !== '') {

							if (validateJSON(additionalFieldsJson) !== undefined) {

								Object.assign(body, JSON.parse(additionalFieldsJson));

							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (additionalFields.customProperties) {
							const data: any = {}; // tslint:disable-line:no-any
							//@ts-ignore
							additionalFields.customProperties.customProperty.map(property => {
								data[property.key] = property.value;
							});

							body.data = data;
						}

						if (additionalFields.email) {
							body.email = additionalFields.email as string;
						}

						if (additionalFields.createdAt) {
							body.created_at = new Date(additionalFields.createdAt as string).getTime() / 1000;
						}
					}

					const endpoint = `/customers/${id}`;

					responseData = await customerIoApiRequest.call(this, 'PUT', endpoint, body, 'tracking');

					responseData = Object.assign({ id }, body);
				}

				if (operation === 'delete') {
					const id = this.getNodeParameter('id', i) as number;

					body.id = id;

					const endpoint = `/customers/${id}`;

					await customerIoApiRequest.call(this, 'DELETE', endpoint, body, 'tracking');

					responseData = {
						success: true,
					};
				}
			}

			if (resource === 'event') {
				if (operation === 'track') {
					const customerId = this.getNodeParameter('customerId', i) as number;
					const eventName = this.getNodeParameter('eventName', i) as string;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					body.name = eventName;

					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;

						if (additionalFieldsJson !== '') {

							if (validateJSON(additionalFieldsJson) !== undefined) {
								Object.assign(body, JSON.parse(additionalFieldsJson));
							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const data: any = {}; // tslint:disable-line:no-any

						if (additionalFields.customAttributes) {
							//@ts-ignore
							additionalFields.customAttributes.customAttribute.map(property => {
								data[property.key] = property.value;
							});
						}

						if (additionalFields.type) {
							data.type = additionalFields.type as string;
						}

						body.data = data;
					}

					const endpoint = `/customers/${customerId}/events`;

					await customerIoApiRequest.call(this, 'POST', endpoint, body, 'tracking');
					responseData = {
						success: true,
					};
				}

				if (operation === 'trackAnonymous') {
					const eventName = this.getNodeParameter('eventName', i) as string;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;

					body.name = eventName;

					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;

						if (additionalFieldsJson !== '') {

							if (validateJSON(additionalFieldsJson) !== undefined) {

								Object.assign(body, JSON.parse(additionalFieldsJson));

							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const data: any = {}; // tslint:disable-line:no-any

						if (additionalFields.customAttributes) {
							//@ts-ignore
							additionalFields.customAttributes.customAttribute.map(property => {
								data[property.key] = property.value;
							});
						}
						body.data = data;
					}

					const endpoint = `/events`;
					await customerIoApiRequest.call(this, 'POST', endpoint, body, 'tracking');

					responseData = {
						success: true,
					};
				}
			}

			if (resource === 'message') {
				if (operation === 'get') {
					const messageId = this.getNodeParameter('messageId', i) as number;
					const endpoint = `/messages/${messageId}`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.message;
				}

				if (operation === 'getAll') {
					const endpoint = `/messages`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.messages;
				}
			}

			if (resource === 'newsletter') {
				if (operation === 'get') {
					const newsletterId = this.getNodeParameter('newsletterId', i) as number;
					const endpoint = `/newsletters/${newsletterId}`;
			
					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.newsletter;
				}
			
				if (operation === 'getAll') {
					const endpoint = `/newsletters`;
			
					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.newsletters;
				}

				if (operation === 'getContent') {
					const newsletterId = this.getNodeParameter('newsletterId', i) as number;
					const contentId = this.getNodeParameter('contentId', i) as number;
					const endpoint = `/newsletters/${newsletterId}/contents/${contentId}`;
			
					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.content;
				}

				if (operation === 'getContentLinks') {
					const newsletterId = this.getNodeParameter('newsletterId', i) as number;
					const contentId = this.getNodeParameter('contentId', i) as number;
					const endpoint = `/newsletters/${newsletterId}/contents/${contentId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');

					const enrichedData = [];
					for (const item of responseData.links) {
						enrichedData.push({
							id: item.link && item.link.id,
							url: item.link && item.link.href,
							newsletter_id: newsletterId,
							content_id: contentId,
						});
					} 

					responseData = enrichedData;
				}

				if (operation === 'getContentLinkMetrics') {
					const newsletterId = this.getNodeParameter('newsletterId', i) as number;
					const contentId = this.getNodeParameter('contentId', i) as number;
					const endpoint = `/newsletters/${newsletterId}/contents/${contentId}/metrics/links`;

					responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
					responseData = responseData.links;
				}
			
				if (operation === 'getMetrics') {
					const newsletterId = this.getNodeParameter('newsletterId', i) as number;
					const jsonParameters = this.getNodeParameter('jsonParameters', i) as boolean;
			
					if (jsonParameters) {
						const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i) as string;
			
						if (additionalFieldsJson !== '') {
			
							if (validateJSON(additionalFieldsJson) !== undefined) {
			
								Object.assign(body, JSON.parse(additionalFieldsJson));
			
							} else {
								throw new Error('Additional fields must be a valid JSON');
							}
						}
					} else {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const period = this.getNodeParameter('period', i) as string;
						let endpoint = `/newsletters/${newsletterId}/metrics`;
			
						if (period !== 'days') {
							endpoint = `${endpoint}?period=${period}`;
						}
						if (additionalFields.steps) {
							body.steps = additionalFields.steps as number;
						}
						if (additionalFields.type) {
							if (additionalFields.type === 'urbanAirship') {
								additionalFields.type = 'urban_airship';
							} else {
								body.type = additionalFields.type as string;
							}
						}
			
						responseData = await customerIoApiRequest.call(this, 'GET', endpoint, body, 'beta');
						responseData = responseData.metric;
					}
				}
			}

			if (resource === 'segment') {
				const segmentId = this.getNodeParameter('segmentId', i) as number;
				const customerIds = this.getNodeParameter('customerIds', i) as string;

				body.id = segmentId;
				body.ids = customerIds.split(',');

				let endpoint = '';

				if (operation === 'add') {
					endpoint = `/segments/${segmentId}/add_customers`;
				} else {
					endpoint = `/segments/${segmentId}/remove_customers`;
				}

				responseData = await customerIoApiRequest.call(this, 'POST', endpoint, body, 'tracking');

				responseData = {
					success: true,
				};
			}

			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as unknown as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
