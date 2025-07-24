import {
  allAchievements,
  allAdditionalInfos,
  allProfessionalExperiences,
  allPersonalProjects,
  personalInfo,
} from '@content';
import { ClassValue } from 'class-variance-authority/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const fullName = `${personalInfo.givenName} ${personalInfo.familyName}`;

export const initials = `${personalInfo.givenName.slice(0, 1)}${personalInfo.familyName.slice(0, 1)}`;

export const sortedProfessionalExperiences = allProfessionalExperiences.sort(
  (a, b) => {
    const aOrderNumber = Number.parseInt(
      a._raw.sourceFileName.replaceAll(/^\D+/g, ''),
    );
    const bOrderNumber = Number.parseInt(
      b._raw.sourceFileName.replaceAll(/^\D+/g, ''),
    );
    return aOrderNumber - bOrderNumber;
  },
);

export const sortedAchievements = allAchievements.sort((a, b) => {
  const aOrderNumber = Number.parseInt(
    a._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  const bOrderNumber = Number.parseInt(
    b._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  return aOrderNumber - bOrderNumber;
});

export const sortedPersonalProjects = allPersonalProjects.sort((a, b) => {
  const aOrderNumber = Number.parseInt(
    a._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  const bOrderNumber = Number.parseInt(
    b._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  return aOrderNumber - bOrderNumber;
});

export const sortedAdditionalInfos = allAdditionalInfos.sort((a, b) => {
  const aOrderNumber = Number.parseInt(
    a._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  const bOrderNumber = Number.parseInt(
    b._raw.sourceFileName.replaceAll(/^\D+/g, ''),
  );
  return aOrderNumber - bOrderNumber;
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
