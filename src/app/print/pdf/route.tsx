import { allPrivateFields } from '@content';
import { renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import PDF from 'src/components/pdf/pdf';

export const dynamic = 'force-static';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request): Promise<NextResponse> {
  const privateInformation = allPrivateFields;

  const pdfStream = await renderToBuffer(
    <PDF privateInformation={privateInformation} />,
  );

  return new NextResponse(pdfStream, {
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
