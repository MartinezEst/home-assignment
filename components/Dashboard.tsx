import { SportEvent } from '@/interfaces/SportEvent.interface';
import React, { FC } from 'react';
import SportEventItem from './SportEventItem';
import { SportEvents } from '@/interfaces/SportEvents.interface';
import map from 'lodash/map';

const Dashboard: FC<SportEvents> = ({ sportEvents }) => {
  return (
    <div className="flex flex-wrap justify-center gray-light my-24 mx-4">
      {map(sportEvents, (event: SportEvent) => (
        <SportEventItem {...event} key={event.id} />
      ))}
    </div>
  );
};

export default Dashboard;
