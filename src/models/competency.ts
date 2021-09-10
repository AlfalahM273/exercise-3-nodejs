import mongoose from "../datasource/database";
export interface ICompetency {
	skill: string;
	level: string;
	selfClaim: string;
	evidenceImgUrl?: string;
}

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
        evidenceImgUrl:
        {
            type: String
        },
    },
    { timestamps: true }
);

export default mongoose.model<ICompetency>('competency', CompetencySchema )
