import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Tasks from '../components/tasks/Tasks'
import Board from '../components/leaderboard/Board'


export default props =>
    < Switch >
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/tasks' component={Tasks} />
        <Route path='/leaderboard' component={Board} />
        <Redirect from='*' to='/' />
    </Switch >