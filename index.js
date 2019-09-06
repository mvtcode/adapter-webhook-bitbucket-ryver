'use strict';

const axios = require('axios');

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const repository_name = body.repository.name;
	const repository_url = body.repository.links.html.href;
	const repository_avatar = body.repository.links.avatar.href;

	const messages = [];

	const changes = body.push.changes;
	changes.forEach(change => {
		messages.push(
			// branch: change.new.name,
			// branch_link: change.new.links.html.href,
			// hash_link: change.new.target.links.html.href,
			// author: change.new.target.author.raw,
			// comment: change.new.target.message
			`Branch: **[${change.new.name}](${change.new.links.html.href})**\nUser: **${change.new.target.author.raw}**\n> Comment: **[${change.new.target.message}](${change.new.target.links.html.href})**`
		);
	});

	if(messages.length > 0) {
		await axios.post(process.env.endpoint, {
			createSource: {
				displayName: 'BitBucket',
				avatar: repository_avatar
			},
			body: `Repository: **[${repository_name}](${repository_url})**\n ${messages.join('\n')}`
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