<template>
    <v-row>
        <v-col cols="12">
            <v-card-title class="pb-1">
                Tema
            </v-card-title>
            <v-card-subtitle>
                Selecione o tema da interface.
            </v-card-subtitle>

        </v-col>
        <v-col cols="12" class="d-flex justify-center">
            <v-card height="140" width="180" @click="toggleTheme('light')" class="mx-4 temaClaro" :class="userConfigStore.theme == 'light' ? 'selected-border': ''">
                    <div class="top-bar"></div>
                    <div class="main">
                        <div class="left-bar"></div>
                        <div class="center-box">
                            <div class="top-bar">
                                <div class="sub-shade"></div>
                                <div class="sub-shade"></div>
                                <div class="sub-shade"></div>
                            </div>
    
                        </div>
                        <div class="right-bar"></div>
                    </div>
                </v-card>
                <v-card height="140" width="180" @click="toggleTheme('dark')" class="mx-4 temaEscuro" :class="userConfigStore.theme == 'dark' ? 'selected-border': ''">
                    <div class="top-bar"></div>
                    <div class="main">
                        <div class="left-bar"></div>
                        <div class="center-box">
                            <div class="top-bar">
                                <div class="sub-shade"></div>
                                <div class="sub-shade"></div>
                                <div class="sub-shade"></div>
                            </div>
        
        
                        </div>
                        <div class="right-bar"></div>
                    </div>
                </v-card>
           

        </v-col>
    </v-row>
</template>
<script setup>
import { useUserConfigStore } from '@/stores/userConfigs.js';
const userConfigStore = useUserConfigStore()
function toggleTheme (themeValue) {
    userConfigStore.changeTheme(themeValue)
}
</script>
<style lang="scss">

$light-base-color: white;
$light-elements-color: #f0f0f0;
$light-board-color: #c0c0c0;
$light-border-color: #75757556;
$light-board-bar-color: #363636;
$light-board-bar-sub-color: #b8b8b8;

$dark-base-color: #242424;
$dark-elements-color: #353535;
$dark-board-color: #8D8D8D;
$dark-border-color: #686868;
$dark-board-bar-color: #424242;
$dark-board-bar-sub-color: #b8b8b8;
.selected-border{
    border: 4px rgb(33, 150, 243) solid !important;
}
.temaClaro {
    border: 4px transparent solid;
    background-color: $light-base-color;
    /* tom claro */
    display: flex;
    flex-direction: column;

    .top-bar {
        height: 10%;
        background-color: $light-elements-color;
        border-bottom: 1px $light-border-color solid;
    }

    .main {
        flex: 1;
        display: flex;
    }

    .left-bar {
        width: 7%;
        background-color: $light-elements-color;
        border-right: 1px $light-border-color solid;
    }

    .right-bar {
        width: 25%;
        background-color: $light-elements-color;
        border-left: 1px $light-border-color solid;
    }

    .center-box {
        width: 40%;
        height: 50%;
        background-color: $light-board-color;
        margin: auto;
        border-radius: 4px;

        .top-bar {
            height: 10%;
            border-radius: 3px 3px 0px 0px;
            background-color: $light-board-bar-color;
            display: flex;
            padding: 1%;

            .sub-shade {
                height: 100%;
                margin-top: 1%;
                border-radius: 1px;
                margin-right: 2%;
                margin-left: 1%;
                background-color: $light-board-bar-sub-color;
                width: 12%;
            }
        }
    }
}

.temaEscuro {
    background-color: $dark-base-color;
    /* tom claro */
    border: 4px transparent solid;
    display: flex;
    flex-direction: column;

    .top-bar {
        height: 10%;
        background-color: $dark-elements-color;
        border-bottom: 1px $dark-border-color solid;
    }

    .main {
        flex: 1;
        display: flex;
    }

    .left-bar {
        width: 7%;
        background-color: $dark-elements-color;
        border-right: 1px $dark-border-color solid;
    }

    .right-bar {
        width: 25%;
        background-color: $dark-elements-color;
        border-left: 1px $dark-border-color solid;
    }

    .center-box {
        width: 40%;
        height: 50%;
        background-color: $dark-board-color;
        margin: auto;
        border-radius: 4px;

        .top-bar {
            height: 10%;
            border-radius: 3px 3px 0px 0px;
            background-color: $dark-board-bar-color;
            display: flex;
            padding: 1%;

            .sub-shade {
                height: 100%;
                margin-top: 1%;
                border-radius: 1px;
                margin-right: 2%;
                margin-left: 1%;
                background-color: $dark-board-bar-sub-color;
                width: 12%;
            }
        }
    }
}
</style>