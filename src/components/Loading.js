import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { MotionContainer, varBounceIn } from '../components/animate';
import { motion } from 'framer-motion';


export default function Loading() {
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
                        <Typography variant="h3" paragraph style={{ color: "#102770" }}>
                            Loading
                        </Typography>
                        <Box
                            component="img"
                            src="/preloader.jpg"
                        // sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                        />
                    </motion.div>
                </Box>
            </MotionContainer>
        </Container>
    )
}