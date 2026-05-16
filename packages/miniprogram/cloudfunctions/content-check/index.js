const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const { action } = event;

  try {
    switch (action) {
      case 'checkText':
        return await checkText(event);

      case 'checkImage':
        return await checkImage(event);

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Content check error:', error);
    throw error;
  }
};

async function checkText(event) {
  const { content } = event;

  if (!content) {
    throw new Error('Content is required');
  }

  try {
    const result = await cloud.openapi.security.msgSecCheck({
      content: content
    });

    // result.errCode === 0 means content is safe
    // result.errCode === 87014 means content contains illegal information
    if (result.errCode === 0) {
      return {
        safe: true,
        message: 'Content is safe'
      };
    } else {
      return {
        safe: false,
        message: 'Content contains illegal or sensitive information'
      };
    }
  } catch (err) {
    // If error code is 87014, content is unsafe
    if (err.errCode === 87014) {
      return {
        safe: false,
        message: 'Content contains illegal or sensitive information'
      };
    }

    // For other errors, log and return safe to avoid blocking legitimate content
    console.error('Text check error:', err);
    return {
      safe: true,
      message: 'Content check failed, defaulting to safe'
    };
  }
}

async function checkImage(event) {
  const { fileID } = event;

  if (!fileID) {
    throw new Error('FileID is required');
  }

  try {
    // Download the image from cloud storage
    const res = await cloud.downloadFile({
      fileID: fileID
    });

    const buffer = res.fileContent;

    // Check image content
    const result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/png',
        value: buffer
      }
    });

    // result.errCode === 0 means image is safe
    // result.errCode === 87014 means image contains illegal content
    if (result.errCode === 0) {
      return {
        safe: true,
        message: 'Image is safe'
      };
    } else {
      return {
        safe: false,
        message: 'Image contains illegal or sensitive content'
      };
    }
  } catch (err) {
    // If error code is 87014, content is unsafe
    if (err.errCode === 87014) {
      return {
        safe: false,
        message: 'Image contains illegal or sensitive content'
      };
    }

    // For other errors, log and return safe to avoid blocking legitimate content
    console.error('Image check error:', err);
    return {
      safe: true,
      message: 'Image check failed, defaulting to safe'
    };
  }
}
