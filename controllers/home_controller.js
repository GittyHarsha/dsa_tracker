
const { get } = require("mongoose");
const problems=require("../models/problems");

function getDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    date=year+'-'+month+'-'+day;
    return date;
}

module.exports.home= async function(req, res) {
    var today = new Date();
    today=getDate(today);
    console.log("today's date", today);

    const query=problems.find({date_seen: today});
    //const problems_count = await query.count();
    //console.log("problem count", problems_count);
    const promise=query.exec();

    
    console.log("in homecontroller.home");
    promise.then(

        function(list){
           // console.log(list);

            res.render('home', 
            {
                problems_list: list,
                problems_count: list.length
            }
            );
        });
};
function removeHttp(url) {
    const regex = /^https?:\/\//;
    return url.replace(regex, "");
  }

  function removeSuffix(s) {
    const regex = /\..*$/;
    return s.replace(regex, "");
  }

module.exports.addProblem=function(req, res) {
    var today = new Date();
    today=getDate(today);
   // console.log("today's date", today);
    var problem_url=req.body.problem_url;
    problem_url=removeHttp(problem_url);
    problem_url=problem_url.split('/');
    //console.log("entered problem url removing http: ", problem_url);
    var category=removeSuffix(problem_url[0]);
    var problem_name;

    if(category=="leetcode") {
        problem_name=problem_url[2];
    }
    else if(category=="codechef") {
        problem_name=problem_url[2];
    }
    else if(category=="codeforces") {
        problem_name=problem_url[2]+problem_url[4];
    }
    else if(category=="atcoder") {
        problem_name=problem_url[-1];
    }
    const promise=problems.create(
        {
            category: category,
            date_seen: today,
            url: req.body.problem_url,
            status: "Attempt",
            name: problem_name
        }
    );

    promise.then(
        function (obj) {
            console.log("problem added: ", obj);
            res.redirect('back');
        }
    ).catch(
        function(err) {
            console.log(err);
        }
    );


};

module.exports.deleteProblem=function(req, res) {
let id=req.body.id;

        let query=problems.findByIdAndDelete(id);
        query.exec().then(function(deletedProblem) {
            console.log("problem deleted: ",deletedProblem);
        }).catch(function(err) {
            console.log("error deleting");
        });
     
    



res.redirect('back');

};

module.exports.updateProblem = function(req, res) {
    const id=req.body.id;
    console.log("updating problem: ", id);
    const query=problems.findByIdAndUpdate(id, {status: req.body.status});
    const promise=query.exec();
    promise.then(function(updatedProblem) {
        console.log("updated problem: ", updatedProblem);
        res.redirect('back');
    }).catch(function(err) {if(err) {console.log(err)}});
};