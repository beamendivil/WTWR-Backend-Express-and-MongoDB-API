const DEFAULT_ERROR = 500;

class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
	}
}

class UnauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 401;
	}
}

class ForbiddenError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 403;
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 404;
	}
}

class ConflictError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 409;
	}
}

module.exports = {
	DEFAULT_ERROR,
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
};