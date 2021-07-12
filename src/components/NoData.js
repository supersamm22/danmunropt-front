import { Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { motion } from 'framer-motion';
import React from 'react';
import { MotionContainer, varBounceIn } from './animate';

export default function NoData() {
    return (
        <Container>
            <MotionContainer initial="initial" open style={{
                display: 'flex', marginTop: 20,
                justifyContent: "center", alignItems: 'center'
            }}>
                <Box sx={{
                    maxWidth: 480, margin: 'auto', textAlign: "center"
                }}>
                    <motion.div variants={varBounceIn}>
                        <Typography variant="h3" paragraph>
                            No Data
                        </Typography>
                        <Box
                            component="img"
                            src="/static/report.svg"
                            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                        />
                    </motion.div>
                </Box>
            </MotionContainer>
        </Container>
    )
}