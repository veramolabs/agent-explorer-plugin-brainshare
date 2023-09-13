import React from 'react';
import {
  FileTextOutlined,
} from '@ant-design/icons'

import { IPlugin } from './types';
// import DataGenerator from './DataGenerator';
// import CreateProfileCredential from './CreateProfileCredential';
import IssueCredential from './IssueCredential';
import BrainshareFeed from './BrainshareFeed'
// import CreatePresentation from './CreatePresentation';

const Plugin: IPlugin = {
    //@ts-ignore
    init: (agent) => {
        return {
          name: 'BrainShare',
          description: 'Extremely Cool Something',
          routes: [
            {
              path: '/brainshare/feed',
              element: <BrainshareFeed />,
            },
            // {
            //   path: '/brainshare/issue-profile-credential',
            //   element: <CreateProfileCredential />,
            // },
            // {
            //   path: '/developer/issue-credential',
            //   element: <IssueCredential />,
            // },
          ],
          menuItems: [
            {
              name: 'BrainShare',
              path: '/brainshare',
              icon: <FileTextOutlined />,
              routes: [
                {
                  path: '/brainshare/feed',
                  name: 'BrainShare Feed',
                },
                // {
                //   path: '/developer/issue-profile-credential',
                //   name: 'Issue profile credential',
                // },
                // {
                //   path: '/developer/issue-credential',
                //   name: 'Issue credential',
                // },
              ],
            },
          ],
          
        }
    }
};

export default Plugin;