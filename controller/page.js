const { PageCollection } = require("../Model");
const errorHandler = require("../Utils/Errorhandler");
const logger = require("../Utils/pino");
const slugify = require("slugify");

const CreateContent = async (req, res, next) => {
const { title, content, language } = req.body;
try {
if (!title || !content || !language) {
logger.error("all fields are required");
return next(errorHandler(400, "all fields are required"));
}
// Generate slug from the title
const slug = slugify(title, { lower: true });

// Check if the generated slug already exists
const existingContent = await PageCollection.findOne({ slug });
if (existingContent) {
logger.error("this title is already exist");
return next(errorHandler(400, "this title is already exist"));
}
await PageCollection.insertOne({
title,
slug,
content,
language,
});
res.status(201).json({
success: true,
message: "Content created successfully",
});
} catch (error) {
logger.error(error);
next(error);
}
};

const GetContent = async (req, res, next) => {
try {
const content = await PageCollection.find({}).toArray();
res.status(200).json({
content,
});
} catch (error) {
logger.error(error);
next(error);
}
};

const GetSingleContent = async (req, res, next) => {
try {
const { slug } = req.params;
const content = await PageCollection.findOne({ slug });
if (!content) {
return next(errorHandler(404, "Content not found"));
}
res.json({
success: true,
data: content,
});
} catch (error) {
logger.error(error);
next(error);
}
};

const UpdateContent = async (req, res, next) => {
try {
const { slug } = req.params;
const { title, content, language } = req.body;

if (!title || !content || !language) {
logger.error("All fields are required");
return next(errorHandler(400, "All fields are required"));
}

const existingContent = await PageCollection.findOne({ slug });

if (!existingContent) {
logger.error("Content not found");
return next(errorHandler(404, "Content not found"));
}

const newSlug = slugify(title, { lower: true });

if (title !== existingContent.title) {
const slugExists = await PageCollection.findOne({ slug: newSlug });

if (slugExists) {
logger.error("This title is already exist");
return next(errorHandler(400, "This title is already exist"));
}
}

const update = {
title,
content,
language,
};

if (title !== existingContent.title) {
update.slug = newSlug;
}

const updatedContent = await PageCollection.updateOne(
{ _id: existingContent._id },
{ $set: update }
);

if (updatedContent.modifiedCount === 0) {
return next(errorHandler(500, "Failed to update content"));
}

res.json({
success: true,
message: "Content updated successfully",
data: { ...update, slug: newSlug },
});
} catch (error) {
logger.error(error);
next(error);
}
};

const DeleteContent = async (req, res, next) => {
try {
const { slug } = req.params;
const deletedContent = await PageCollection.findOneAndDelete({ slug });
if (!deletedContent) {
return next(errorHandler(404, "Content not found"));
}
res.json({
success: true,
message: "Content deleted successfully",
});
} catch (error) {
logger.error(error);
next(error);
}
};

module.exports = {
CreateContent,
GetContent,
GetSingleContent,
UpdateContent,
DeleteContent,
};