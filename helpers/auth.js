'use strict';

import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config({ quiet: true, override: false });

function generateToken(user) {
	let payload = {
		subject: user._id,
		name: user.email,
		initialTime: moment().unix(),
		expiration: moment().add('15', 'minutes').unix(),
	};

	return jwt.encode(payload, process.env.TOKEN);
}

function valideToken(request, response, nextStep) {
	try {
		let userToken = request.headers.authorization;
		let cleanToken = userToken.replace('Bearer ', '');
		let payload = jwt.decode(cleanToken, process.env.TOKEN);

		request.headers.userId = payload.subject;
		nextStep();
	} catch (error) {
		response.status(403).send({ success: false, message: 'Invalid or expired token', error: error.message });
	}
}

export { generateToken, valideToken };
