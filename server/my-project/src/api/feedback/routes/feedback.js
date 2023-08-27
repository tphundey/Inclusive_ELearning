'use strict';

/**
 * feedback router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::feedback.feedback');
