import mongoose from "../datasource/database";

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
    { timestamps: true }
);

export default mongoose.model('competency', CompetencySchema )
