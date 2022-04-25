import React from 'react'
import { Card, CardActionArea, IconButton, Typography } from '@mui/material'
import { CardHeader } from '@mui/material'
import { CardContent } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'


export default function NodeCard({node, title, subheader,content ,handleDelete, id }) {
  return (
    <div>
        <Card elevation={1} sx={{height:300} }>
            <CardHeader
                action={
                <IconButton onClick={()=>handleDelete(id)}>
                 <DeleteOutlined/>
                </IconButton>
                }
                title={title}
                subheader={subheader}
            />
            <CardContent >
                <Typography variant='body2' color="textScondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
