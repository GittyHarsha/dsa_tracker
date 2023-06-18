
const { get } = require("mongoose");
const problems=require("../models/problems");

function getDate(date) {
    const year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month<10)
    {
        month="0"+month;
    }

    var day = date.getDate();
    if(day<10) {
        day="0"+day;
    }

    date=year+'-'+month+'-'+day;
    return date;
}



async function fetch_by_date(date) {
    console.log("executing fetch_by_date");
    const query=problems.find({date_seen: date});
    const promise=await query.exec();
    //console.log("type of result of query.exec()", typeof promise);
    //console.log(promise, "date: ", date);
    return promise;
}

module.exports.home= async function(req, res) {
    var today = new Date();
    today=getDate(today);
    console.log("today's date", today);
    var target_date;
    if(req.body.date_change) {
        target_date=req.body.date_change;
        
    }
    else {
        target_date=today;
    }
    console.log("target_date", target_date);
    var list=await fetch_by_date(target_date);
   // console.log("list", list);
    //console.log("list length: ", list.length);
            res.render("home", 
            {
                problems_list: list,
                problems_count: list.length
            }
            );
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
            name: problem_name,
            status_int:0
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
    var st_int=0;
    if(req.body.status=="Accepted") st_int=2;
    else if(req.body.status=="Seen") st_int=1;
    const query=problems.findByIdAndUpdate(id, {status: req.body.status, status_int: st_int});
    const promise=query.exec();
    promise.then(function(updatedProblem) {
        console.log("updated problem: ", updatedProblem);
        res.redirect('back');
    }).catch(function(err) {if(err) {console.log(err)}});
};

module.exports.changeDate=async function(req, res) {
    let date_change=req.body.date_change;

    console.log("date to change: ", date_change);
    var list=await fetch_by_date(date_change);
    res.render('home', 
    {
        problems_list: list,
        problems_count: list.length
    }
    ); 
    };