import reducers from '../../reducers';

test('reducers', () => {
  let state;
  
  state = reducers({users:[],user:{status:'',user:[],error:null},tweets:[{name:'Elizabeth Pinero',words:0,text:'tues',comments:[],date:'2022-12-06 : 17:03:29.457Z',image:'',likes:0,retweets:0,id:'lbbajzw0'}]}, {type:'addTweet',payload:{name:'Elizabeth Pinero',words:0,text:'tues',comments:[],date:'2022-12-06 : 17:03:29.457Z',image:'',likes:0,retweets:0,id:'lbbajzw0'}});

  expect(state).toEqual({users:[],user:{status:'',user:[],error:null},tweets:[{name:'Elizabeth Pinero',words:0,text:'tues',comments:[],date:'2022-12-06 : 17:03:29.457Z',image:'',likes:0,retweets:0,id:'lbbajzw0'},{name:'Elizabeth Pinero',words:0,text:'tues',comments:[],date:'2022-12-06 : 17:03:29.457Z',image:'',likes:0,retweets:0,id:'lbbajzw0'}]});
});