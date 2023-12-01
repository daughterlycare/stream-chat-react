import React from 'react';

import { DownloadIcon } from './icons';
import { SafeAnchor } from '../SafeAnchor';

type DownloadButtonProps = {
  assetUrl?: string;
};

export const DownloadButton = ({ assetUrl }: DownloadButtonProps) => (
  <SafeAnchor
    className='str-chat__message-attachment-file--item-download'
    href={assetUrl}
    target='_blank'
  >
    <DownloadIcon className='str-chat__message-attachment-download-icon' />
  </SafeAnchor>
);
