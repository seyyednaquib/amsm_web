import React from 'react'
import { Card, IconButton, Typography } from '@mui/material'
import { CardHeader } from '@mui/material'
import { CardContent } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'


export default function NodeCard({node, handleDelete}) {
  return (
    <div>
        <Card elevation={1} sx={{height:150}}>
            <CardHeader
                action={
                <IconButton onClick={()=>handleDelete(node.serviceid)}>
                 <DeleteOutlined/>
                </IconButton>
                }
                title={node.service}
                subheader={node.workingHours}
            />
            <CardContent>
                <Typography variant='body2' color="textScondary">
                    {node.content}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}