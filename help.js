function valToKey(list,val)
{
    var result=[];
    for(var i in list)
    {
        if(list[i]==val)
            result.push(i);
    }
    return result;
}

function valToSub(list,val) 
{
    var result=[];
    for(var i=0;i<list.length;i++)
    {
        if(list[i]==val)
            result.push(i);
    }
    return result;
}

function min(list) 
{
    return Math.min.apply(null,list);    
}

function max(list)
{
    return Math.max.apply(null,list);
}

function minkey(list) 
{
    return valToKey(list,min(list));
}

function maxkey(list)
{
    return valToKey(list,max(list));
}

function minsub(list)
{
    return valToSub(list,min(list));
}

function maxsub(list)
{
    return valToSub(list,max(list));
}