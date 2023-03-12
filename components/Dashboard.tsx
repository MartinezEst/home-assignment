import { SportEvent } from '@/interfaces/SportEvent.interface';
import React, { FC } from 'react';
import SportEventItem from './SportEventItem';
import { SportEvents } from '@/interfaces/SportEvents.interface';
import map from 'lodash/map';

const Dashboard: FC<SportEvents> = ({ sportEvents }) => {
  return (
    <div className="container flex flex-col gray-light my-24 mx-auto">
      {map(sportEvents, (event: SportEvent) => (
        <SportEventItem {...event} key={event.id} />
      ))}
    </div>
  );
};

export default Dashboard;
