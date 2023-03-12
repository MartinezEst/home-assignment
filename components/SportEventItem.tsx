import { Competitor } from '@/interfaces/Competitor.interface';
import { SportEvent } from '@/interfaces/SportEvent.interface';
import { Selection } from '@/interfaces/Selection.interface';
import React, { FC, useEffect } from 'react';
import { Market } from '@/interfaces/Market.interface';
import find from 'lodash/find';
import map from 'lodash/map';
import { MarketName } from '@/enums/MarketName.enum';
import moment from 'moment';
import 'moment/locale/et';

// Set locale to Estonian
moment.locale('et');

const SportEventMarket: FC<Market> = (market) => {
  const { name, selections } = market;
  const roundedOdds = (number: number): number => {
    return Math.round(number * 100) / 100;
  };
  return (
    <div
      className="sport-event__right__market max-md:px-6 flex flex-row justify-between items-center w-full grow pt-4 pr-6"
      key={name}>
      {map(selections, (selection: Selection) => (
        <div
          className="sport-event__right__market__selection h-full flex flex-col justify-evenly items-center px-2 bg-secondary rounded-lg"
          key={selection.id}>
          <div>{selection.name}</div>
          <div className="font-bold">{roundedOdds(selection.odds) || 'No data'}</div>
        </div>
      ))}
    </div>
  );
};

const SportEventItem: FC<SportEvent> = (sportEvent) => {
  const { id, startTime, updatedAt, category, competitors, markets } = sportEvent;
  const doubleMarket: Market | undefined = find(markets, (m) => m.name === MarketName['1TIMES2']);

  return (
    <div
      className="sport-event max-w-3xl bg-main flex justify-between items-stretch self-center w-full py-8 my-2 rounded-lg flex-wrap"
      key={id}>
      <div className="sport-event__left grow text-white basis-4/6 flex flex-col justify-between items-left pl-6">
        {/* Sport name */}
        <div className="pb-4">{category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}</div>
        {/* Competitors */}
        {map(competitors, (competitor: Competitor) => (
          <div className="sport-event__left__competitor flex justify-between items-center pb-4" key={competitor.id}>
            <div className="sport-event__left__competitor__name">{competitor.name}</div>
            <div className="sport-event__left__competitor__score text-green pr-8">{competitor.score}</div>
          </div>
        ))}
        {/* StartTime */}
        <div className="sport-event__left__start-time text-gray-lighter pb-4">
          Starts: {moment(startTime).format('DD/MM HH:mm')}
        </div>
        {/* UpdatedAt */}
        <div className="sport-event__left__updated-at text-gray-lighter">
          Updated: {moment(updatedAt).format('DD/MM HH:mm')}
        </div>
      </div>
      <div className="sport-event__right max-md:pt-6 max-md:h-48 max-md:justify-evenly basis-2/6 grow flex flex-col justify-between text-white text-center">
        <div className="font-bold">{doubleMarket?.name} Market</div>
        {/* 1x2 Market */}
        {doubleMarket && <SportEventMarket {...doubleMarket} />}
        {!doubleMarket && <div className="text-gray-lighter">No data</div>}
      </div>
    </div>
  );
};

export default SportEventItem;
