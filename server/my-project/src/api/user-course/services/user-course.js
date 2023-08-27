'use strict';

/**
 * user-course service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-course.user-course');
