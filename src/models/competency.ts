import mongoose from "mongoose";

const CompetencySchema = new mongoose.Schema(
    {
        skill:
        {
            type: String,
            required: true,
            maxlength: 50
        },
        level:
        {
            type: String,
            enum: ['entry', 'working', 'good', 'expert'],
            default: 'entry'
        },
        selfClaim:
        {
            type: String,
            maxlength: 50,
            required: true,
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('competencyt', CompetencySchema )
