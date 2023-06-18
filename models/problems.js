const mongoose=require('mongoose');
const { ENUM } = require('mysql/lib/protocol/constants/types');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["codeforces", "leetcode", "codechef", "atcoder"]
    },
    date_seen: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Accepted", "Seen", "Attempt"]
    },
    status_int: {
        type: Number,
        required: true
    }
});

var problems_list=mongoose.model('problems', problemSchema);
module.exports=problems_list;