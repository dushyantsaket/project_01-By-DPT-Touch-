import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true },
    permissions: [{ type: String }], // Array of allowed modules
  },
  { timestamps: true }
);

export default mongoose.model("RolePermission", rolePermissionSchema);
