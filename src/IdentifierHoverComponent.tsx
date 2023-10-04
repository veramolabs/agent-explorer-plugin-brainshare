import React from 'react';
import { IIdentifierHoverComponentProps } from "@veramo-community/agent-explorer-plugin";
import { IDataStoreORM } from '@veramo/core-types';
import { useVeramo } from '@veramo-community/veramo-react';
import { useQuery } from 'react-query';
import { Spin, Typography } from 'antd';

export const IdentifierHoverComponent: React.FC<IIdentifierHoverComponentProps> = ({did}) => {
  const { agent } = useVeramo<IDataStoreORM>()

  const { data: credentials, isLoading, refetch } = useQuery(
    ['domain-linkage', { agentId: agent?.context.name }],
    () =>
      agent?.dataStoreORMGetVerifiableCredentials({
        where: [{ column: 'type', value: ['VerifiableCredential,BrainShareDomainLinkage'] }, {column: 'subject', value: [did]}],
        order: [{ column: 'issuanceDate', direction: 'DESC' }],
      }),
  )

  const domain = React.useMemo<string | undefined>(() => {
    return credentials?.[0]?.verifiableCredential?.credentialSubject?.domain
  }, [credentials])

  if (isLoading) {
    return (
      <Spin />
    )
  }

  if (domain === undefined) {
    return null
  }

  return (
    <Typography.Text>
      {domain}
    </Typography.Text>
  )
}


