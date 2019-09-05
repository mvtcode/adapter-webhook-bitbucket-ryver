'use strict';

const axios = require('axios');

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const repository_name = body.repository.name;

	const messages = [];

	const changes = body.push.changes;
	changes.forEach(change => {
		messages.push(
			// branch: change.new.name,
			// link: change.new.target.links.html.href,
			// author: change.new.target.author.raw,
			// comment: change.new.target.message
			`User: **${change.new.target.author.raw}**\n> Comment: **[${change.new.target.message}](${change.new.target.links.html.href})**`
		);
	});

	if(messages.length > 0) {
		await axios.post(process.env.endpoint, {
			createSource: {
				displayName: 'BitBucket',
				avatar: 'https://wac-cdn.atlassian.com/dam/jcr:a17e66da-d0a1-4912-878c-6e103111b9df/Bitbucket-icon-blue-rgb.svg?cdnVersion=550'
			},
			body: `Repository: **${repository_name}**\n ${messages.join('\n')}`
		});

		return {
			statusCode: 200,
			body: JSON.stringify('done')
		};
	} else {
		return {
			statusCode: 401
		};
	}
};