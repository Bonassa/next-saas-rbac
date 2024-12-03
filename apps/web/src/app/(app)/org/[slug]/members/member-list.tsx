import { organizationSchema } from '@bonassa/auth'
import { ArrowLeftRight, Crown, UserMinus2 } from 'lucide-react'
import Image from 'next/image'

import { ability, getCurrentOrgSlug } from '@/auth/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const currentOrg = getCurrentOrgSlug()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership({ organizationSlug: currentOrg! }),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              const isMe = membership.userId === member.userId
              const isOwner = organization.ownerId === member.userId
              const showTransferOwnershipButton =
                permissions?.can('transfer_ownership', authOrganization) &&
                !isOwner
              const showDeleteMemberButton =
                permissions?.can('delete', 'User') && !isMe && !isOwner
              const showUpdateRoleButton =
                permissions?.can('update', 'User') && !isMe && !isOwner

              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          className="aspect-square size-full"
                          alt={`Foto do membro ${member.name}`}
                        />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {isMe && ' (me)'}
                        {isOwner && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {showTransferOwnershipButton && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex items-center gap-2"
                        >
                          <ArrowLeftRight className="size-3" />
                          Transfer ownership
                        </Button>
                      )}

                      {showUpdateRoleButton && (
                        <UpdateMemberRoleSelect
                          memberId={member.id}
                          value={member.role}
                        />
                      )}

                      {showDeleteMemberButton && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button size="sm" variant="destructive" type="submit">
                            <UserMinus2 className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
