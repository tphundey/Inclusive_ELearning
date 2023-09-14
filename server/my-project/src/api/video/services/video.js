'use strict';

/**
 * video service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::video.video');
