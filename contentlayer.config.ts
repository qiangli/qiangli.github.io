import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';

export const PersonalInfo = defineDocumentType(() => ({
  name: 'PersonalInfo',
  filePathPattern: 'personal-info.md',
  isSingleton: true,
  fields: {
    givenName: {
      type: 'string',
      description: 'Your first name or given name',
      required: true,
    },
    familyName: {
      type: 'string',
      description: 'Your last name or family name',
      required: true,
    },
    title: {
      type: 'string',
      description: 'Your current job title or a short description of your goal',
      required: false,
    },
    location: {
      type: 'string',
      description:
        'Your general location of residence, not your personal address',
      required: false,
    },
  },
}));

export const ProfessionalTitle = defineNestedType(() => ({
  name: 'ProfessionalTitle',
  fields: {
    title: {
      type: 'string',
      description: 'A title at this organization',
      required: false,
    },
    startDate: {
      type: 'string',
      description: 'The year when you started the role',
      required: false,
    },
    endDate: {
      type: 'string',
      description:
        'The year when you ended the role, or empty if it is your current role',
      required: false,
    },
    description: {
      type: 'string',
      description:
        'A description of the work you did under this role, or your accomplishments that led to a promotion',
      required: false,
    },
  },
}));

export const ProfessionalExperience = defineDocumentType(() => ({
  name: 'ProfessionalExperience',
  filePathPattern: 'professional-experiences/*.md',
  fields: {
    organization: {
      type: 'string',
      description: 'The name of the company or organization you worked with',
      required: false,
    },
    titles: {
      type: 'list',
      of: ProfessionalTitle,
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
  },
}));

export const Achievement = defineDocumentType(() => ({
  name: 'Achievement',
  filePathPattern: 'achievements/*.md',
  fields: {
    achievement: {
      type: 'string',
      description:
        'The name of the degree or certification of your achievement',
      required: false,
    },
    organization: {
      type: 'string',
      description:
        'The name of the school, organization, or program you earned your achievement from',
      required: false,
    },
    completionYear: {
      type: 'number',
      description: 'The year you earned your achievement',
      required: false,
    },
  },
}));


export const PersonalProjects = defineDocumentType(() => ({
  name: 'PersonalProjects',
  filePathPattern: 'personal-projects/*.md',
  isSingleton: false,
  fields: {
    title: {
      type: 'string',
      description: 'The name of the personal projects section',
      required: false,
    },
  },
}));


export const AdditionalInfo = defineDocumentType(() => ({
  name: 'AdditionalInfo',
  filePathPattern: 'additional-items/*.md',
  isSingleton: false,
  fields: {
    title: {
      type: 'string',
      description: 'The name of the additional info section',
      required: false,
    },
    // Optional cloudbox-embed slot. When `cloudboxApp` is set, the
    // AdditionalItem component renders an iframe via the cloudbox
    // embed.js snippet (Mode A by default — no login required, the
    // upstream app handles its own auth in-iframe). See the embedding
    // plan at dhnt/docs/handlers-test-flake-fix-plan.md siblings for
    // the full integration spec.
    cloudboxApp: {
      type: 'string',
      description: 'Outpost-advertised app name (e.g. classgo)',
      required: false,
    },
    cloudboxHost: {
      type: 'string',
      description: 'Cloudbox-registered host that serves the app',
      required: false,
    },
    cloudboxLogin: {
      type: 'string',
      description: 'Login mode: none | subdomain | popup (default: none)',
      required: false,
    },
    cloudboxOrigin: {
      type: 'string',
      description: 'Cloudbox origin to load embed.js from (default: https://ai.dhnt.io)',
      required: false,
    },
    cloudboxHeight: {
      type: 'string',
      description: 'Initial iframe height in CSS px (default: 640)',
      required: false,
    },
    cloudboxPath: {
      type: 'string',
      description: 'Optional in-app subpath, must start with /',
      required: false,
    },
    cloudboxLinkTitle: {
      type: 'string',
      description:
        'Optional link label rendered above the iframe, pointing at the app URL',
      required: false,
    },
  },
}));

export const PrivateField = defineDocumentType(() => ({
  name: 'PrivateField',
  filePathPattern: 'private-fields/*.md',
  fields: {
    label: {
      type: 'string',
      description: 'A label to describe the private field',
      required: false,
    },
  },
}));

export default makeSource({
  contentDirPath: 'edit-me/content',
  documentTypes: [
    PersonalInfo,
    ProfessionalExperience,
    PersonalProjects,
    Achievement,
    AdditionalInfo,
    PrivateField,
  ],
});
