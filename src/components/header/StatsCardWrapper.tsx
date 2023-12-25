import StatCard, { StatCardProps } from '@components/header/StatCard.tsx';
import React from 'react';

interface StatsCardWrapperProps {
  cards: StatCardProps[];
}

const StatsCardWrapper: React.FC<StatsCardWrapperProps> = (props) => {
  const { cards } = props;
  return (
    <div className="flex gap-x-4 my-8">
      {cards.map((card) => {
        return (
          <StatCard
            key={card.name}
            name={card.name}
            content={card.content}
            icon={card.icon}
          />
        );
      })}
    </div>
  );
};
export default StatsCardWrapper;
