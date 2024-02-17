import { Schema, model, Document, Model } from "mongoose";
import { AlphabeticString } from "../../constants";

// Error Prefixes Model Initialized here
interface CustomFunctionModel extends Model<PrefixDocument> {
  insertWithCustomCode(data: Record<string, any>): Promise<PrefixDocument>;
}

export interface PrefixDocument extends Document {
  name: string;
  code: string;
};

export const PrefixSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    length: 2
  }
});

PrefixSchema.statics.insertWithCustomCode = async function(data: PrefixDocument): Promise<Object> {
  const lastDocument = await this.findOne({}, {}, { sort: { code: -1 } });
  const nextCode = lastDocument ? getNextCustomId(lastDocument.code) : "01";
  const newData = { ...data, code: nextCode };
  await this.create(newData);
  console.log(`Data inserted with new CustomCode ${nextCode}`);
  return newData;
}

export const PrefixModel = model<PrefixDocument, CustomFunctionModel>("Prefix", PrefixSchema);

// Error Severity Model Initialized here
export interface SeverityDocument extends Document {
  name: string;
};

export const SeveritySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const SeverityModel = model<SeverityDocument>("Severity", SeveritySchema);

// Error Fields Model Initialized here

export interface FieldDocument extends Document {
  name: string,
  code: string,
};

export const FieldSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    length: 3,
    required: true,
    unique: true
  }
});

FieldSchema.statics.insertWithCustomCode = async function(data: FieldDocument): Promise<Object> {
  const lastDocument = await this.findOne({}, {}, { sort: { code: -1 } });
  const nextCode = lastDocument ? getNextCustomId(lastDocument.code) : "001";
  const newData = { ...data, code: nextCode };
  await this.create(newData);
  console.log(`Data inserted with new CustomCode ${nextCode}`);
  return newData;
}

export const FieldModel = model<FieldDocument, CustomFunctionModel>("Field", FieldSchema);

// Error Codes Model Initialized here
export interface ErrorReasonDocument extends Document {
  error_name: AlphabeticString,
  message: string,
  code?: string
};

export const ErrorReasonSchema: Schema = new Schema({
  error_name: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    length: 4
  }
});

ErrorReasonSchema.statics.insertWithCustomCode = async function(data: ErrorReasonDocument): Promise<Object> {
  const lastDocument = await this.findOne({}, {}, { sort: { code: -1 } });
  const nextCode = lastDocument ? getNextCustomId(lastDocument.code) : "0001";
  const newData = { ...data, code: nextCode };
  await this.create(newData);
  console.log(`Data inserted with new CustomCode ${nextCode}`);
  return newData;
}

export const ErrorReasonModel = model<ErrorReasonDocument, CustomFunctionModel>("ErrorReason", ErrorReasonSchema);

// Custom Error Codes Uniting All 4 models from Prefix, Severity, Field and Code models.

export interface CustomErrorDocument extends Document {
  prefix: PrefixDocument["_id"];
  severity: SeverityDocument["_id"];
  field: FieldDocument["_id"];
  reason: ErrorReasonDocument["_id"];
  errorCode: string;
  description: string;
  custom_id: string;
}

export const CustomErrorSchema: Schema = new Schema({
  prefix: {
    type: Schema.Types.ObjectId,
    ref: "Prefix",
    required: true
  },
  severity: {
    type: Schema.Types.ObjectId,
    ref: "Severity",
    required: true
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: "Field",
    required: true
  },
  reason: {
    type: Schema.Types.ObjectId,
    ref: "ErrorReason",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  custom_id: {
    type: String,
    required: true,
    unique: true,
    length: 5
  }
});

CustomErrorSchema.virtual("errorCode").get(function () {
  return `${this.severity.name}-${this.prefix.code}-${this.field.code}-${this.reason.code}`;
});

CustomErrorSchema.set("toObject", { getters: true });
CustomErrorSchema.set("toJSON", { getters: true });

CustomErrorSchema.pre("find", function () {
  this.populate('prefix severity field reason');
});

CustomErrorSchema.statics.insertWithCustomCode = async function(data: CustomErrorDocument): Promise<Object> {
  const lastDocument = await this.findOne({}, {}, { sort: { custom_id: -1 } });
  const nextCustomID = lastDocument ? getNextCustomId(lastDocument.custom_id) : "00001";
  const newData = { ...data, custom_id: nextCustomID };
  await this.create(newData);
  console.log(`Data inserted with new CustomCode ${nextCustomID}`);
  return newData;
}

export const CustomErrorModel = model<CustomErrorDocument, CustomFunctionModel>("CustomError", CustomErrorSchema);

// Function to get the next custom ID with leading zeros
function getNextCustomId(lastCustomId: string): string {
  const numericId = parseInt(lastCustomId, 10);
  const nextNumericId = numericId + 1;
  return nextNumericId.toString().padStart(lastCustomId.length, '0');
}