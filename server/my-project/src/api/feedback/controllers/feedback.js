'use strict';

/**
 * feedback controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::feedback.feedback');
