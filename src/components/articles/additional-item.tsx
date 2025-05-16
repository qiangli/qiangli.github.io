import { AdditionalInfo } from '@content';
import { ReactNode } from 'react';
import { Heading } from 'src/components/heading/heading';
import Prose from 'src/components/prose/prose';

export default function AdditionalItem({
  title,
  body,
}: AdditionalInfo): ReactNode {
  return (
    <article className="space-y-4">
      <div className="space-y-1">
        <Heading className="text-balance" level={3}>
          <br />
          {title}
        </Heading>
      </div>

      <Prose html={body.html} />
    </article>
  );
}
