import Video from "../models/video";

import { videoSchema, videoUpdateSchema } from '../schemas/video';
import slugify from "slugify";

export const getAllVideo = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _keywords = "",
  } = req.query;
  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? 1 : -1,
    },
  };
  try {
    // Tìm kiếm dữ liệu video
    const searchVideoData = (videos) => {
      return videos?.docs?.filter((item) =>
        item?.videoTitle?.toLowerCase().includes(_keywords)
      );
    };
    const videos = await Video.paginate({}, option);
    if (!videos.docs || videos.docs.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    const searchDatavideo = await searchData(videos);
    const videoResponse = await { ...videos, docs: searchDatavideo };

    res.status(200).json({
      message: "Lấy danh mục thành công ",
      CategoryResponse,
      pagination: {
        currentPage: videos.page,
        totalPages: videos.totalPages,
        totalItems: videos.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video || video.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy video",
      });
    }
    return res.json({ message: "lấy video thành công", video });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getVideoBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const data = await Video.findOne({ slug });
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
export const create = async (req, res) => {
  const { videoTitle } = req.body;
  const videos = req.body;
  try {
    const data = await Video.findOne({ videoTitle });
    if (data) {
      return res.status(400).json({
        message: "video đã tồn tại",
      });
    }
    // validate
    const { error } = videoSchema.validate(videos);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const video = await Video.create(videos);
    if (!video || video.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy video",
      });
    }
    return res.json({
      message: "Thêm video thành công",
      video,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    // Xóa danh mục
    const video = await Video.findByIdAndDelete(videoId);

    return res.json({
      message: "Xóa video thành công!",
      video,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const updateVideo = async (req, res) => {
  const { videoTitle } = req.body;
  const id = req.params.id;
  const formData = req.body;
  try {
    const { error } = videoUpdateSchema.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const newSlug = slugify(videoTitle, { lower: true });

    const video = await Video.findByIdAndUpdate(
      id,
      { ...formData, slug: newSlug },
      {
        new: true,
      }
    );
    if (!video || video.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy video",
      });
    }
    return res.json({ message: "sửa video thành công", video });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getVideoCourse = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate("course");

    if (!category) {
      return res.status(400).json({
        message: "Không tìm thấy video",
      });
    }

    const videoData = video.videoData;
    return res.json({
      message: "Lấy danh sách sản phẩm theo danh mục thành công",
      videoData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
