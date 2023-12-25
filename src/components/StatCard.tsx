import { Card, CardContent } from '@components/ui/card.tsx';
import React from 'react';

interface StatCardProps {
  name: string;
  content: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ name, content, icon }) => {
  return (
    <Card className="py-4">
      <CardContent>
        <div className="flex items-center space-x-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground">
            {icon}
          </div>
          <div>
            <p className="text-md text-muted-foreground">{name}</p>
            <h1 className="text-4xl font-semibold leading-none tracking-tight">
              {content}
            </h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatCard;
