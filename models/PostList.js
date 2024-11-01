const mongoose = require("mongoose");
const { Schema } = mongoose;

const postListSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "UserProperty",
      required: true,
    },
    address: { type: String, required: true },
    suburb: { type: String, required: true },
    ownerSituation: { type: String, required: true },
    keyFeatures: { type: Schema.Types.Mixed, required: true },
    commissionFee: { type: String },
    improvementMaxOutcome: { type: String, required: true },
    logicalPrice: { type: String },
    soldProperties: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    engagedPurchaser: { type: String },
    agent: { type: Schema.Types.Mixed, required: true },
    shareableLink: {
      type: String,
      unique: true,
      required: true,
    },
    processChain: {
      type: [Schema.Types.Mixed],
      default: null,
    },
    marketingPrice: {
      type: String,
    },
    marketingItems: {
      type: [String],
    },
    vendors: {
      type: [Schema.Types.Mixed],
    },
    recommendedSaleProcess: { type: String, default: null },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const PostList = mongoose.model("PostList", postListSchema);

module.exports = PostList;
