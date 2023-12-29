import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAY1BMVEX///8AAACTk5Po6Og1NTX09PT8/Px0dHTb29uCgoL5+fm4uLgVFRXPz8+enp7i4uLHx8dbW1svLy+rq6sODg48PDzBwcFqampOTk6NjY1JSUkmJiZ7e3vu7u5BQUFTU1MdHR21+UTGAAAB+UlEQVR4nO2Zi46CQAxFrTA8BQUFxV3U///K1XUTDTBFsVOSzT0/4MkM7bTXxQIAAAAAAAAAAAAAOMfL0nyZp5k3n0KQhT7d8cNsJomooGeKaA6JnLrk+hLfPQmiWFsiHpBQ19gOShBtNSXWO4vFbq1oEVokiEI9ich2FNfD0KvXpVWCaKlmUTEWlZZEwkgQJUoWa9ZCq0oy1kLrWduwFhsli4i10CrVlrVolSwWrIWWBNPANVt4zVjUahaJvXlWWk3rSmq1SPUkFsHeIrEPFC2sxapWpneGO5f6MhD1v9Bqho2k7X4be+Xr+GPzvJwVWq9YHy8PD37pH8J8xnX5hmm91syrAICFwBij+nh0MFHdFCe/LEv/VDR1NEelZPGx0zuPsXK25eWrwddspdi92njY4dcjVnpNtl9WhxtfGnmOd2YdbhycXws3fj9wPH32Q85hnEafzYsSRI07ieGQcxhn0eer1+H0Ul77MB842RW9NyWIHBRsUoz/bIdCfme1Jd8c4l3Uu0ywuEjfyTtF+kC4XM0kCSLZyYdLvjlEU3FTTrQoJQ+Dz1k5JLdXLtTjEYz8zGmyxUnuSvj4nUduLrdHeuPIjV3TWtYducY1PvDaOYtZ2NePcS5iFh9IyP1HEHxkIbXQJ83yAxTjeQAAAAAAAAAAAIB/zg+jkhOcoOvE2QAAAABJRU5ErkJggg=="
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;