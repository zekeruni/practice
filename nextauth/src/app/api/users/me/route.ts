import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json(
            {
                message: "User found successfully",
                data: user,
            }, 
            { status: 200 },
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        );
    };
};
