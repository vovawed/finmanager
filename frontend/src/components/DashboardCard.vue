<template>
    <div class="card dashboard-card text-white mb-3">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">
            <h2 class="headText">{{headText}}</h2>{{text}}</p>
            <small>{{smallText}}</small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DashBoardCard",
        props: ['title', 'head-text', 'text', 'small-text']
    }
</script>

<style scoped lang="less">
    .dashboard-card {
        box-shadow: 0 3px 15px 0 rgba(2, 0, 0, 0.25);

        background: rgba(79, 105, 194, 1);
        background: -moz-linear-gradient(-45deg, rgba(79, 105, 194, 1) 0%, rgba(169, 79, 194, 1) 100%);
        background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(79, 105, 194, 1)), color-stop(100%, rgba(169, 79, 194, 1)));
        background: -webkit-linear-gradient(-45deg, rgba(79, 105, 194, 1) 0%, rgba(169, 79, 194, 1) 100%);
        background: -o-linear-gradient(-45deg, rgba(79, 105, 194, 1) 0%, rgba(169, 79, 194, 1) 100%);
        background: -ms-linear-gradient(-45deg, rgba(79, 105, 194, 1) 0%, rgba(169, 79, 194, 1) 100%);
        background: linear-gradient(135deg, rgba(79, 105, 194, 1) 0%, rgba(169, 79, 194, 1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4f69c2', endColorstr='#a94fc2', GradientType=1);

        .card-title {
            font-size: 85%;
            text-transform: uppercase;
        }

        .headText {
            display: inline;
            margin-right: 5px;
        }

        border: none;
    }
</style>
