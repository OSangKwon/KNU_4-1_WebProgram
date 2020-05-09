oParams= getUrlParams();
input=oParams.input.split(',');
score=Number(oParams.score);
lives=oParams.lives;    
level=oParams.level;
time = oParams.time;
var rank =[3,3,4,3,4,4,4,4,4,5,5,4,5,5,5,5,5,6,6,5,6,5,6,6,6,6,6,7,6,7];
num=rank[(level-1)*2];
cnt=rank[(level-1)*2+1];
history.replaceState({}, null, location.pathname);
var answer = []
var dir = [];
for(var i=0;i<num;i++)
{
    dir[i]=[];
    for(var j=0;j<num;j++)
    {
        dir[i][j]=0;
    }
}
console.log(input);
document.write("<h1 align=center id='top' style='color:white'>level: "+level+" lives: "+lives+"</h1>");
printTable();
var timer = setInterval(function(){
   time++;
},1000);

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}
function printTable(){
    document.write("<table>");
    var i, j;
    for(i=0;i<num;i++)
    {
        document.write("<tr>");
        for(j=0;j<num;j++)
        {
            document.write("<td>" +"<input style='width:"+500/num+"pt;height:"+500/num+"pt;border-radius: 30px;' onclick='func(this.id)' type='button' value='' id='"+i+","+j+"'></input>" +"</td>");
            document.getElementById(""+i+","+j).style.backgroundColor = "black";
        }
        document.write("</tr>");
    }
    document.write("</table>");
}
function func(id){
    var location=[];
    location=id.split(',');
    dir[location[0]][location[1]]++;
    if(dir[location[0]][location[1]]%2==0)
        document.getElementById(id).style.backgroundColor = "black";
    else
        document.getElementById(id).style.backgroundColor = "white";
}
function end(){
    /*
    for(var x=0;x<num;x++){
        for(var y=0;y<num;y++){
            document.getElementById(""+x+","+y).style.backgroundColor = "black";
        }
    }
    */
    location.href="result.html?time="+time+"&score="+score+"&level="+level;
}
function check(){ 
    var temp=0;
    for(var x=0;x<num;x++){
        for(var y=0;y<num;y++){
                if(document.getElementById(""+x+","+y).style.backgroundColor == "white")
                    temp++;
        }
    }
    var temp2=0;
    console.log(cnt);
    for(var z=0;z<cnt;z++)
    {
        var i;
        var j;
        i= parseInt(input[z]/num);
        j= input[z]%num;
        if(document.getElementById(""+i+","+j).style.backgroundColor == "white")
            temp2++;
    }
    console.log(temp,temp2,cnt);
    if(temp==cnt&&temp2==cnt)
    {
        num++;
        cnt++;
        level++;
        //console.log(num,cnt);
        score+=Number(10);
        if(level<16){
            location.href="game3.html?time="+time+"&score="+score+"&level="+level+"&lives="+lives;
        }
        else{
            location.href="result.html?time="+time+"&score="+score+"&level="+level;
        }

    }
    else
    {
        lives--;
        document.getElementById('top').innerHTML = "level: "+level+" lives: "+lives;
        if(lives==0)
        {
            location.href="result.html?time="+time+"&score="+score+"&level="+level;
        }
    }
}
function showpopup(page){
    window.open(page, "answer", "width=300, height=150, left=100, top=50");
}
function home(){
    location.href="../index.html";
}