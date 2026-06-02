import { AdditionalInfo } from '@content';
import { ReactNode } from 'react';
import { Heading } from 'src/components/heading/heading';
import Prose from 'src/components/prose/prose';
import CloudboxEmbed from 'src/components/cloudbox-embed/cloudbox-embed';

export default function AdditionalItem({
  title,
  body,
  cloudboxApp,
  cloudboxHost,
  cloudboxLogin,
  cloudboxOrigin,
  cloudboxHeight,
  cloudboxPath,
  cloudboxLinkTitle,
}: AdditionalInfo): ReactNode {
  return (
    <article className="space-y-4">
      <div className="space-y-1">
        <Heading className="text-balance" level={3}>
          <br />
          {title}
        </Heading>
      </div>

      {body.html && <Prose html={body.html} />}

      {cloudboxApp && cloudboxHost && (
        <CloudboxEmbed
          app={cloudboxApp}
          host={cloudboxHost}
          login={cloudboxLogin}
          origin={cloudboxOrigin}
          height={cloudboxHeight}
          path={cloudboxPath}
          linkTitle={cloudboxLinkTitle}
        />
      )}
    </article>
  );
}
