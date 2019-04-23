import React from 'react';
import './listzc.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        // {
        //   title: '时间：2013年2月5日',
        //   content: '《国务院办公厅关于印发近期土壤环境保护和综合治理工作安排的通知',
        //   link: 'www.jusfoun.com'
        // },
        // {
        //   title: '时间：2013年2月5日',
        //   content: '《国务院办公厅关于印发近期土壤环境保护和综合治理工作安排的通知',
        //   link: 'www.jusfoun.com'
        // },
        // {
        //   title: '时间：2013年2月5日',
        //   content: '《国务院办公厅关于印发近期土壤环境保护和综合治理工作安排的通知',
        //   link: 'www.jusfoun.com'
        // },
        // {
        //   title: '时间：2013年2月5日',
        //   content: '《国务院办公厅关于印发近期土壤环境保护和综合治理工作安排的通知',
        //   link: 'www.jusfoun.com'
        // }
      ]
    };
  }

  setData(d) {
    this.lock = true;
    this.setState({
      data: d
    });
  }

  componentDidUpdate() {
    let me = this;
    clearInterval(this.timer);
    me.refs.listRef.style.top = 0;
    if (this.state.data.length > 3) {
      let n = 0;
      // me.refs.listRef.innerHTML += me.refs.listRef.innerHTML;
      this.timer = setInterval(() => {
        n--;
        me.refs.listRef.style.top = n + 'px';
        // if (n <= -(me.refs.formBoxRef.offsetHeight + 10)) {
        //   n = 0;
        // }
        if (n <= -(me.refs.listRef.offsetHeight + 10) / 2) {
          n = 0;
        }
      }, 1000 / 20);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createList() {
    let data = this.state.data;
    if (data.length > 3) {
      data = data.concat(data);
    }
    let node = data.map((s, i) => {
      return (
        <li key={'list' + i}>
          <p>{s.title}</p>
          <p>{s.content}</p>
          <div>
            <span>相关链接: </span>
            <a href={s.link} target={'_blank'}>{s.link}</a>
          </div>
        </li>
      );
    });
    return node;
  }

  render() {
    const me = this;
    return (
      <div style={{overflow: 'hidden', position: 'relative', top: 100, height: 345}} ref='formBoxRef'>
        <ul className={'list-zc-wrap-xf'} ref='listRef'>{me.createList()}</ul>
      </div>
    );
  }
};

export default Page;
