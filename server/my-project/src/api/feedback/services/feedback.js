'use strict';

/**
 * feedback service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::feedback.feedback');
