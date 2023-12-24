import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip.tsx';
import React from 'react';

interface TooltipContentProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipContentProps> = ({
  content,
  trigger,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default TooltipWrapper;
