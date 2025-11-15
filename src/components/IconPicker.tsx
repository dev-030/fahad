
'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import * as FaIcons from 'react-icons/fa'; // Assuming Font Awesome is installed and imported like this

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

const iconList = [
  'FaTrophy',
  'FaFistRaised',
  'FaStar',
  'FaShieldAlt',
  'FaDumbbell',
  'FaAward',
  'FaBolt',
  'FaFire',
  'FaMedal',
  'FaUniformMartialArts',
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SelectedIcon = value ? (FaIcons as any)[value] : null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {SelectedIcon ? (
            <SelectedIcon className="mr-2 h-4 w-4" />
          ) : (
            'Select Icon'
          )}
          {value || ''}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
        {iconList.map((iconName) => {
          const IconComponent = (FaIcons as any)[iconName];
          return (
            <DropdownMenuItem
              key={iconName}
              onSelect={() => {
                onChange(iconName);
                setIsOpen(false);
              }}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />} 
              {iconName}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
