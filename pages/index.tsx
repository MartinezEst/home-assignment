import { FC, useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import client from '@/apollo';
import Query from '@/api/sportEventQuery';
import { SportEvent } from '@/interfaces/SportEvent.interface';
import Subscription from '@/api/sportEventSubscription';
import Dashboard from '@/components/Dashboard';
import { SportEvents } from '@/interfaces/SportEvents.interface';
import map from 'lodash/map';

export const getServerSideProps = async () => {
  const { data, error } = await client.query(Query);

  if (error || !data.sportEventQuery) {
    return {
      props: {
        sportEvents: [],
      },
    };
  }

  const sportEvents: SportEvent[] = data.sportEventQuery;

  return {
    props: {
      sportEvents,
    },
  };
};

const Index: FC<SportEvents> = ({ sportEvents: initialSportEvents }) => {
  const [sportEvents, setSportEvents] = useState<SportEvent[]>(initialSportEvents);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  // Initialize subscription
  const { error, data } = useSubscription(Subscription);

  useEffect(() => {
    if (data && data.sportEventSubscription) {
      // Replace the old sport event with the new one
      const updatedSportEvents: SportEvent[] = map(sportEvents, (sportEvent: SportEvent) => {
        if (sportEvent.id === data.sportEventSubscription.id) {
          return data.sportEventSubscription;
        }
        return sportEvent;
      });
      setSportEvents(updatedSportEvents);

      // Show snackbar
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
    }
  }, [data, sportEvents]);

  if (error)
    return (
      <div className="flex items-center bg-blue-500 text-white text-lg font-bold fixed top-0 left-10 pt-8">
        Error: Something is not right
      </div>
    );

  return (
    <>
      {showSnackbar && (
        <div className="flex items-center bg-secondary text-white p-6 animate-bounce rounded-lg py-text-white text-lg font-bold fixed top-8 left-10">
          <p>Data updated!</p>
        </div>
      )}
      <Dashboard sportEvents={sportEvents} />
    </>
  );
};

export default Index;
